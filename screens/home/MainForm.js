import React, { PureComponent } from 'react';
import { Container, View } from 'native-base';
import ImagePicker from 'react-native-image-picker';
import { Button } from 'react-native-elements';
import { Picker, TextInput, Alert } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getApiPayload, validateForm, summary, saveQuote } from '../../services/vehicleServices';
import Loader from '../../components/custom/Loader';
import { commonStyles } from '../../styles/commonStyles';
import { appColors } from '../../styles/colors';
import TextF from '../../components/custom/TextF';
import ViewSlider from './components/ViewSlider';
import { quoteStyles } from '../../styles/quoteStyles';
import QuoteCarousel from '../quote/components/QuoteCarousel';
import { compressImage, handleException } from '../../services/handlers/commonServices';
import { ScrollView } from 'react-native-gesture-handler';

class MainForm extends PureComponent {
  state = {
    media: [],
    vehicleCategories: [], vehicleBrands: [], vehicleReferences: [], vehicleModels: [], vehicleSection: [], vehicleItems: [],
    formData: { category: '0', brand: '0', reference: '0', model: '0', section: '0', item: '0', description: '',
      sentBy: this.props.navigation.getParam('userId') },
    textCounter: 0,
    showLoader: false,
  }

  componentWillMount() { this.fillList(''); }

  handleMediaFromGallery = async (isImage) => {
    const options = { mediaType: isImage ? 'image' : 'video', noData: true, videoQuality: 'medium' };
    this.showLoader(true);
    const self = this;
    ImagePicker.launchImageLibrary(options, async (response) => {
      this.showLoader(false);
      if (response.uri) {
        const { media } = this.state;
        response = await compressImage(response.uri, 500, 420, 75);
        media.push(response);
        self.setState(prevState => ({ ...prevState, media }));
        this.forceUpdate();
      }
    });
  }

  onRemoveImage = (uri) => {
    let { media } = this.state;
    media = media.filter(x => x.uri !== uri);
    this.setState(prev => ({ ...prev, media }));
  }

  showLoader = show => this.setState(prevState => ({ ...prevState, showLoader: show }));

  setValue = (name, value) => {
    this.setState(prevState => ({
      ...prevState,
      formData: { ...prevState.formData, [name]: value },
    }), () => { if (value !== '0' && name !== 'item') this.fillList(name, value); });
  }

  inputChangeHandler = (name, value) => {
    const endValue = name === 'description' && this.state.formData.description.length === 500
      ? this.state.formData.description : value;
    this.setState(prevState => ({ ...prevState,
      formData: { ...prevState.formData, [name]: endValue },
      textCounter: prevState.formData.description.length,
    }));
  };

  fillList = async (currentPage, value) => {
    const { func, payload, list } = getApiPayload(this.state, currentPage, value);
    try {
      let resp = [];
      if (func) {
        const req = await func(payload);
        resp = await req.json();
      } else if (payload) { resp = payload; }

      this.setState(prev => ({ ...prev, [list]: resp.output }));
    } catch (err) { handleException('022', err, this); }
  }

  onSubmitForm = async () => {
    this.showLoader(true);
    try {
      const req = await saveQuote({ ...this.state.formData, media: this.state.media });
      const resp = await req.json();
      this.showLoader(false);
      if (!resp.success) {
        Alert.alert('Error', resp.message);
      } else {
        Alert.alert('!Solicitud Exitosa!',
          'Durante las próximas 24 horas recibiras las mejores ofertas de diferentes proveedores',
          [{ text: 'OK', onPress: () => {
            this.props.navigation.popToTop();
            this.props.navigation.navigate('ServiceList');
           } }],
          { cancelable: false });
        console.log(resp);
      }
    } catch (err) { handleException('023', err, this); }
  }

  questionContent = (num, question, list, name) => {
    let title = null;
    let picker = null;
    if (num < 7) {
      title = (<TextF h1 style={{ fontSize: 22, marginBottom: 30 }}>{question}</TextF>);
      picker = (
        <Picker
          selectedValue={this.state.formData[name]}
          style={{ height: 50, width: '85%', paddingStart: 15, color: appColors.grey }}
          mode="dropdown"
          onValueChange={v => this.setValue(name, v)}
        >
          <Picker.Item label="Seleccione Opción" value="0" />
          {list && list.map(x => (
            <Picker.Item key={x._id || x.id} label={x.name} value={x._id || x.id} />
          ))}
        </Picker>
      );
    }

    let item = null;
    if (num === 6) {
      item = (
        <>
          <TextF style={{ ...quoteStyles.descriptionText, marginTop: 10 }}>
            Describe aquí con más detalle el artículo que necesitas, así podremos encontrarlo por ti más facilmente.
          </TextF>
          <TextInput
            style={{ ...quoteStyles.descriptionInput, height: 120 }}
            ref={(c) => { this.descriptionInput = c; }}
            value={this.state.formData.description}
            onChangeText={text => this.inputChangeHandler('description', text)}
            multiline
            numberOfLines={3}
          />
          <TextF style={quoteStyles.textCounter}>
            {`${this.state.textCounter}/500 caracteres`}
          </TextF>
          <TextF style={quoteStyles.descriptionText}>
            Puedes adjuntar fotos del artículo que necesitas
          </TextF>
          <View style={{ ...quoteStyles.mediaButtonsContainer, ...{ marginTop: 5 } }}>
            <Button
              type="outline"
              icon={{ type: 'font-awesome', name: 'camera', size: 35, color: appColors.secondary }}
              buttonStyle={quoteStyles.imagePickerBtnStyles}
              onPress={() => this.handleMediaFromGallery(true)}
            />
          </View>
          {this.state.media.length ? (
            <View style={{ marginTop: 15, height: 170 }}>
              <QuoteCarousel media={this.state.media} onRemove={this.onRemoveImage} />
            </View>
          ) : null}
        </>
      );
    }
    return (
      <>
        {title}
        {picker}
        {item}
      </>
    );
  }

  render = () => {
    const {
      vehicleItems, vehicleCategories, vehicleBrands, vehicleReferences, vehicleModels, vehicleSection,
    } = this.state;
    return (
      <Container style={{ ...commonStyles.container, flexGrow: 1 }}>
        <Loader show={this.state.showLoader} />
        <View style={commonStyles.titleContainer}>
          <TextF style={{ ...commonStyles.title, fontWeight: 'bold' }} h1>COTIZADOR</TextF>
        </View>
        <ViewSlider
          pages={[
            { content: this.questionContent(1, 'Seleccione tipo de vehiculo', vehicleCategories, 'category') },
            { content: this.questionContent(2, 'Seleccione marca de vehiculo', vehicleBrands, 'brand') },
            { content: this.questionContent(3, 'Seleccione referencia de vehiculo', vehicleReferences, 'reference') },
            { content: this.questionContent(4, 'Seleccione modelo/año de vehiculo', vehicleModels, 'model') },
            { content: this.questionContent(5, 'Seleccione sección del vehiculo', vehicleSection, 'section') },
            { content: this.questionContent(6, 'Seleccione repuesto que necesitas', vehicleItems, 'item') },
            { content: summary(this.state) },
          ]}
          validateForm={currentPage => validateForm(this.state, currentPage)}
          submitForm={this.onSubmitForm}
        />
      </Container>
    );
  }
}

MainForm.propTypes = {
  language: PropTypes.shape({
    search: PropTypes.string.isRequired,
    see_all: PropTypes.string.isRequired,
  }).isRequired,
  navigation: PropTypes.any.isRequired,
};

const mapStateToProps = state => ({
  language: state.login.language,
  loginInfo: state.login.loginInfo,
});

export default connect(mapStateToProps, null)(MainForm);
