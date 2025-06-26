import { google } from 'googleapis';
import { NextRequest } from 'next/server';
import { CourseDataType, TableDataType } from '@/app/types/Types';

export async function GET(request: NextRequest) {

   try {
      const { searchParams } = new URL(request.url);

      const zscore = searchParams.get("zscore");
      let selectz = searchParams.get("selectz");
      const district = searchParams.get("district");
      const stream = searchParams.get("stream");
      const university = searchParams.get("university");
      const subject = searchParams.get("subject");
      const keyword = searchParams.get("keyword");

      if (!zscore || !selectz || !district || !stream || !subject) {
         return Response.json(
            {
               message: "Missing required parameters: zscore, selectz, district, stream, university, subject.",
            },
            { status: 400 }
         );
      }
      if (isNaN(Number(zscore))) {
         return Response.json(
            {
               message: "Z-Score must be a valid number.",
            },
            { status: 400 }
         );
      }
      if (selectz !== 'true' && selectz !== 'false') {
         selectz = "false"
      }
      if (district && typeof district !== 'string') {
         return Response.json(
            {
               message: "District is invalid.",
            },
            { status: 400 }
         );
      }
      if (stream && typeof stream !== 'string') {
         return Response.json(
            {
               message: "Stream  is invalid.",
            },
            { status: 400 }
         );
      }
      if (subject && typeof subject !== 'string') {
         return Response.json(
            {
               message: "Subject  is invalid.",
            },
            { status: 400 }
         );
      }
      const subjects = subject.split(",").map(s => s.trim());
      if (subjects.length != 3) {
         return Response.json(
            {
               message: "Please select exactly 3 subjects.",
            },
            { status: 400 }
         );
      }
      console.log("Fetching data with parameters:", {
         zscore, selectz, district, stream, university, subjects, keyword
      });

      const keyFile = process.env.GOOGLE_SERVICE_ACCOUNT!;
      const credentials = JSON.parse(keyFile);

      const auth = new google.auth.GoogleAuth({
         credentials,
         scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
      });

      const sheets = google.sheets({ version: 'v4', auth });

      const spreadsheetId = process.env.SPREADSHEET_ID;  // Replace with your actual Sheet ID
      const range = process.env.DEGREE_PROGRAMS_RANGE

      const response = await sheets.spreadsheets.values.get({
         spreadsheetId,
         range,
      });

      const titles = response.data.values?.[0] || [];

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


      let filtered = data as CourseDataType[]
      const validDist: keyof CourseDataType | undefined = district

      filtered = filtered.filter(course => course[validDist] != 'NQC')

      if (selectz == 'false') {
         filtered = filtered.filter(course => parseFloat(course[validDist]) <= parseFloat(zscore))
      }

      filtered = filtered.filter(c => (c.stream == stream && subjects.every(sub => c.subjects.includes(sub))) || (c.stream != stream && subjects.every(sub => c.subjects.includes(sub))))

      if (university) {
         filtered = filtered.filter(c => c.university == university)
      }

      if (keyword) {
         filtered = filtered.filter(c => c.course.toLowerCase().includes(keyword))
      }
      console.log("filetred: ", filtered.length, data.length)

      let finalData: TableDataType[] = filtered.map(c => {
         const degrees = c.degree.split("|")
         const durations = c.duration.split("|")

         const degree_duration_pairs = degrees.map((deg, index) => {
            return { name: deg, duration: degrees.length == durations.length ? durations.at(index) : durations.at(0) }
         })

         return {
            unicode: c.code,
            courseCode: c.course_code,
            courseName: c.course.toLowerCase(),
            university: c.university.split("_").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
            zscore: Number.parseFloat(c[validDist]).toFixed(4),
            isHidden: false,
            medium: c.medium.split("|"),
            degree_programs: degree_duration_pairs
         }
      })

      finalData = finalData.sort((c1, c2) => parseFloat(c2.zscore) - parseFloat(c1.zscore))

      if (finalData.length === 0) {
         return Response.json(
            {
               message: "No courses found matching the criteria.",
            },
            { status: 404 }
         );
}

      return Response.json(
         {
            message: "Data fetched successfully!",
            data: finalData
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
