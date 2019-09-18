import React from 'react';
import { View } from 'react-native';
import { quoteStyles } from '../../../styles/quoteStyles';
import TextF from '../../../components/custom/TextF';

export const setQuoteMessage = (action, language, price, userId, sender) => {
  let text = {};
  switch (action) {
    case 'Sent':
      text = userId === sender ? language.my_quote_description : language.quote_answer_text;
      break;
    case 'Answered':
      text = (
        <TextF>
          {language.answered_description}
          <TextF style={quoteStyles.statusText}>
            {price ? `$${price}` : '$0'}
          </TextF>
        </TextF>
      );
      break;
    case 'Rejected':
      text = language.rejected_description;
      break;
    case 'Accepted':
      text = userId === sender ? language.accepted_description_sent : language.accepted_description;
      break;
    case 'NoAccepted':
      text = language.no_accepted_description;
      break;
    case 'Finished':
      text = language.finished_description;
      break;
    default:
      return null;
  }

  return (
    <View style={quoteStyles.statusBox}>
      <TextF style={quoteStyles.descriptionText}>{text}</TextF>
    </View>
  );
};


export const setQuoteTitle = (action, language) => {
  let text = '';
  switch (action) {
    case 'Answered':
      text = language.answered;
      break;
    case 'Rejected':
      text = language.rejected;
      break;
    case 'Accepted':
      text = language.accepted;
      break;
    case 'NoAccepted':
      text = language.rejected;
      break;
    default:
      return null;
  }
  return (
    <TextF style={quoteStyles.statusText}>
      {text}
    </TextF>
  );
};
