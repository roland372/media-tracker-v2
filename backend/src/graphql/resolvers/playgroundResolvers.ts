import fs from 'fs';

export const playgroundResolvers = {
  Query: {
    getPlayground() {
      try {
        const filePath = 'C:\\Users\\Damian\\Desktop\\testt.txt';

        if (!fs.existsSync(filePath)) {
          throw new Error('File not found: ' + filePath);
        }

        const content = fs.readFileSync(filePath, 'utf-8');

        console.log(content);
      } catch (err) {
        throw new Error('Error reading file content: ' + err);
      }

      return true;
    }
  }
};