import * as yj from 'yieldable-json';

export const json = {

   parse: async (str: string) => {
    return new Promise((resolve, reject) =>
      yj.parseAsync(str, (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      }),
    );
  },

};
