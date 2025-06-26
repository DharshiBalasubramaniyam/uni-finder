import { google } from 'googleapis';
import { NextRequest } from 'next/server';

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ code: string }> }
) {

   try {
      const keyFile = process.env.GOOGLE_SERVICE_ACCOUNT!;
      const credentials = JSON.parse(keyFile);

      const auth = new google.auth.GoogleAuth({
         credentials,
         scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
      });

      const sheets = google.sheets({ version: 'v4', auth });

      const code = (await params).code 
      const spreadsheetId = process.env.SPREADSHEET_ID;  
      const range = `course_descriptions!B${Number(code)+1}`;

      const response = await sheets.spreadsheets.values.get({
         spreadsheetId,
         range,
      });

      const description = response.data.values?.[0]?.[0] || "Not Available";

      return Response.json(
         {
            message: "Data fetched successfully!",
            data: description
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
