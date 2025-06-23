import { google } from 'googleapis';
import path from 'path';
import { promises as fs } from 'fs';

export async function GET() {

   try {
      const keyFilePath = path.join(process.cwd(), 'service-account.json');
      const keyFile = await fs.readFile(keyFilePath, 'utf-8');
      const credentials = JSON.parse(keyFile);

      const auth = new google.auth.GoogleAuth({
         credentials,
         scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
      });

      const sheets = google.sheets({ version: 'v4', auth });

      const spreadsheetId = '11593XtsICvhF_yDD58mpxyheNGMQVdEcHld8oVVjrrw';  // Replace with your actual Sheet ID
      const range = 'streams!A1:B7';

      const response = await sheets.spreadsheets.values.get({
         spreadsheetId,
         range,
      });

      const titles = response.data.values?.[0] || [];

      if (["label", "value"].every((title) => titles.includes(title)) === false) {
         return Response.json(
            {
               message: "Invalid data format. Expected 'label' and 'value' columns. But found: " + titles.join(", "),
            }
         );
      }

      const values = response.data.values?.slice(1) || [];
      if (values.length === 0) {
         return Response.json(
            {
               message: "No data found in the specified range.",
            }
         );
      }

      const data = values.map(row => {
         const obj: Record<string, string> = {};
         titles.forEach((title, index) => {
            obj[title] = row[index] || '';
         });
         return obj;
      });

      // res.status(200).json({  });
      return Response.json(

         {
            message: "Data fetched successfully!",
            data: data
         }
      );
   } catch (error) {
      console.error("Error fetching data from Google Sheets:", error);
      return Response.json(
         {
            message: "Internal server error fetching data from Google Sheets.",
         }
      );
   }
}
