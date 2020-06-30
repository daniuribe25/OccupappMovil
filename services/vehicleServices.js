import React from 'react';
import { View } from 'native-base';
import { appConstants } from '../constants/appConstants';
import TextF from '../components/custom/TextF';
import { quoteStyles } from '../styles/quoteStyles';
import QuoteCarousel from '../screens/quote/components/QuoteCarousel';


export const getVehicleCategories = async () => (
  fetch(`${appConstants.API_URL}ve_categories`, {
    method: 'GET',
  })
);

export const getVehicleBrandsByCategory = async categoryId => (
  fetch(`${appConstants.API_URL}ve_brands/${categoryId}`, {
    method: 'GET',
  })
);

export const getVehicleReferencesByBrand = async brandId => (
  fetch(`${appConstants.API_URL}ve_references/${brandId}`, {
    method: 'GET',
  })
);

export const getVehicleSectionsByCategory = async categoryId => (
  fetch(`${appConstants.API_URL}ve_section/${categoryId}`, {
    method: 'GET',
  })
);

export const getVehicleItemsBySection = async sectionId => (
  fetch(`${appConstants.API_URL}ve_item/${sectionId}`, {
    method: 'GET',
  })
);

export const saveQuote = async (quote) => {
  const formData = new FormData();
  Object.keys(quote).forEach((key) => {
    if (key === 'media') {
      const media = quote[key];
      for (let x = 0; x < media.length; x += 1) {
        formData.append(key, media[x]);
      }
    } else {
      formData.append(key, quote[key]);
    }
  });
  return fetch(`${appConstants.API_URL}ve_save`, {
    method: 'POST',
    body: formData,
    headers: { accept: '*/*' },
  });
};

export const getApiPayload = (state, currentPage, value) => {
  let func = null;
  let list = 'vehicleCategories';
  let payload = null;
  const { formData, vehicleReferences } = state;
  switch (currentPage) {
    case 'category':
			func = getVehicleBrandsByCategory;
			list = 'vehicleBrands';
			payload = value;
      break;
    case 'brand':
			func = getVehicleReferencesByBrand;
			list = 'vehicleReferences';
			payload = value;
      break;
    case 'reference':
			list = 'vehicleModels';
			const reference = vehicleReferences.find(x => x._id === formData.reference);
			const output = reference.models ? reference.models.map(x => ({ _id: x, name: x })) : [];
			payload = { output };
      break;
    case 'model':
			func = getVehicleSectionsByCategory;
			list = 'vehicleSection';
			payload = formData.category;
      break;
    case 'section':
			func = getVehicleItemsBySection;
			list = 'vehicleItems';
      payload = value;
			break;
    default:
			func = getVehicleCategories;
			list = 'vehicleCategories';
  		break;
	}
	return { func, payload, list };
};


export const validateForm = (state, currentPage) => {
	const { formData } = state;
	switch (currentPage) {
		case 0: return formData['category'] !== '0';
		case 1: return formData['brand'] !== '0';
		case 2: return formData['reference'] !== '0';
		case 3: return formData['model'] !== '0';
		case 4: return formData['section'] !== '0';
    case 5: return formData['item'] !== '0';
    default: return true;
	}
};

export const summary = (state) => {
  const {
    vehicleCategories, vehicleBrands, vehicleReferences, vehicleModels,
    vehicleSection, vehicleItems, formData,
  } = state;
  const { category, brand, reference, model, section, item, description } = formData;
  const cat = vehicleCategories.find(x => x._id === category);
  const bra = vehicleBrands.find(x => x._id === brand);
  const ref = vehicleReferences.find(x => x._id === reference);
  const mod = vehicleModels.find(x => x._id === model);
  const sec = vehicleSection.find(x => x._id === section);
  const it = vehicleItems.find(x => x._id === item);

  return (
    <>
      <TextF style={quoteStyles.statusText}>
        Información de Respuesto
      </TextF>
      <View>
        <TextF style={{ ...quoteStyles.descriptionText, ...{ textAlign: 'left' } }}>
          <TextF style={quoteStyles.titleText}>Category: </TextF>
          {cat && cat.name}
        </TextF>
      </View>
      <View>
        <TextF style={{ ...quoteStyles.descriptionText, ...{ textAlign: 'left' } }}>
          <TextF style={quoteStyles.titleText}>Marca: </TextF>
          {bra && bra.name}
        </TextF>
      </View>
      <View>
        <TextF style={{ ...quoteStyles.descriptionText, ...{ textAlign: 'left' } }}>
          <TextF style={quoteStyles.titleText}>Referencia: </TextF>
          {ref && ref.name}
        </TextF>
      </View>
      <View>
        <TextF style={{ ...quoteStyles.descriptionText, ...{ textAlign: 'left' } }}>
          <TextF style={quoteStyles.titleText}>Modelo/año: </TextF>
          {mod && mod.name}
        </TextF>
      </View>
      <View>
        <TextF style={{ ...quoteStyles.descriptionText, ...{ textAlign: 'left' } }}>
          <TextF style={quoteStyles.titleText}>Sección: </TextF>
          {sec && sec.name}
        </TextF>
      </View>
      <View>
        <TextF style={{ ...quoteStyles.descriptionText, ...{ textAlign: 'left' } }}>
          <TextF style={quoteStyles.titleText}>Respuesto: </TextF>
          {it && it.name}
        </TextF>
      </View>
      {Boolean(description) && (
        <View>
          <TextF style={{ ...quoteStyles.descriptionText, ...{ textAlign: 'left' } }}>
            <TextF style={quoteStyles.titleText}>Descripción de artículo: </TextF>
            {description}
          </TextF>
        </View>
      )}
      {state.media.length ? (
        <View style={{ marginTop: 15, height: 170 }}>
          <QuoteCarousel media={state.media} />
        </View>
      ) : null}
    </>
  );
};
