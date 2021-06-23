module.exports = {
  format_date: date => {
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
      date
    ).getFullYear()}`;
  },

  if_eq: (a, b, opts) => {
    if (a == b) {
      return opts;
    } else {
      return;
    };
  },

  check_happy: mood_input => {
    if (mood_input == "happy") {
      return "checked"
    }
  },

  check_neutral: mood_input => {
    if (mood_input == "neutral") {
      return "checked"
    }
  },

  check_sad: mood_input => {
    if (mood_input == "sad") {
      return "checked"
    }
  },

  // ,
  // format_url: url => {
  //   return url
  //     .replace('http://', '')
  //     .replace('https://', '')
  //     .replace('www.', '')
  //     .split('/')[0]
  //     .split('?')[0];
  // },
  // format_plural: (word, amount) => {
  //   if (amount !== 1) {
  //     return `${word}s`;
  //   }

  //   return word;
  // }
};

// {
//   Handlebars.registerHelper('if_eq', function(a, b, opts) {
//     if (a == b) {
//         return opts.fn(this);
//     } else {
//         return opts.inverse(this);
//     }
//   });
// }
