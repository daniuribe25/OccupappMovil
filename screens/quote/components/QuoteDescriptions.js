import React from 'react';
import { View, Text } from 'react-native';
import { quoteStyles } from '../../../styles/quoteStyles';

export const setQuoteMessage = (action, language, price) => {
  let text = {};
  switch (action) {
    case 'Sent':
      text = language.quote_answer_text;
      break;
    case 'Answered':
      text = (
        <Text>
          {language.answered_description}
          <Text style={quoteStyles.statusText}>
            {price ? `$${price}` : '$0'}
          </Text>
        </Text>
      );
      break;
    case 'Rejected':
      text = language.rejected_description;
      break;
    case 'Accepted':
      text = language.accepted_description;
      break;
    case 'NoAccepted':
      text = language.no_accepted_description;
      break;
    default:
      return null;
  }

  return (
    <View style={quoteStyles.statusBox}>
      <Text style={quoteStyles.descriptionText}>{text}</Text>
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
    <Text style={quoteStyles.statusText}>
      {text}
    </Text>
  );
};
