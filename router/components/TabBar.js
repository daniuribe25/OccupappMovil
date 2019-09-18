import React from 'react';
import { Keyboard } from 'react-native';
import { BottomTabBar } from 'react-navigation';
import TextF from '../../components/custom/TextF';

class TabBar extends React.Component {
  constructor(props) {
    super(props);

    this.keyboardWillShow = this.keyboardWillShow.bind(this);
    this.keyboardWillHide = this.keyboardWillHide.bind(this);

    this.state = {
      isVisible: true,
    };
  }

  componentWillMount() {
    this.keyboardWillShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardWillShow);
    this.keyboardWillHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardWillHide);
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }

  keyboardWillShow = () => {
    this.setState({
      isVisible: false,
    });
  }

  keyboardWillHide = () => {
    this.setState({
      isVisible: true,
    });
  }

  render = () => {
    return this.state.isVisible
      ? <BottomTabBar {...this.props} />
      : <TextF>Hide</TextF>;
  }
}

export default TabBar;
