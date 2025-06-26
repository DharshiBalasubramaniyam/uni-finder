import { google } from 'googleapis';

export async function GET(
   { params }: { params: {code: number}}
) {
   try {
      const keyFile = process.env.GOOGLE_SERVICE_ACCOUNT!;
      const credentials = JSON.parse(keyFile);

      const auth = new google.auth.GoogleAuth({
         credentials,
         scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
      });

      const sheets = google.sheets({ version: 'v4', auth });

      const spreadsheetId = process.env.SPREADSHEET_ID;  // Replace with your actual Sheet ID
      const range = process.env.DISTRICTS_RANGE;

      const course_code = params.code;
      const response = await sheets.spreadsheets.values.get({
         spreadsheetId,
         "course_descriptions!B",
      });

      const titles = response.data.values?.[0] || [];

      if (["label", "value"].every((title) => titles.includes(title)) === false) {
         return Response.json(
            {
               message: "Invalid data format. Expected 'label' and 'value' columns. But found: " + titles.join(", "),
            },
            { status: 500 }
         );
      }

      const values = response.data.values?.slice(1) || [];
      if (values.length === 0) {
         return Response.json(
            {
               message: "No data found in the specified range.",
            },
            { status: 500 }
         );
      }

      const data = values.map(row => {
         const obj: Record<string, string> = {};
         titles.forEach((title, index) => {
            obj[title] = row[index] || '';
         });
         return obj;
      });

      return Response.json(

         {
            message: "Data fetched successfully!",
            data: data
         },
            { status: 200 }
      );
   } catch (error) {
      console.error("Error fetching data from Google Sheets:", error);
      return Response.json(
         {
            message: "Internal server error fetching data from Google Sheets.",
         },
            { status: 500 }
      );
   }
}
