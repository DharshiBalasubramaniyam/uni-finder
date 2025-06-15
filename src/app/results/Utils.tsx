import Papa from 'papaparse';

export const fetchCSVData = async (csvPath: string, onComplete: (data: any[]) => void) => {
   try {
      const response = await fetch(csvPath);
      const text = await response.text();
      console.log("CSV data fetched successfully:", text.slice(0, 100));
      const result = Papa.parse(text, {
         header: true,
         skipEmptyLines: true,
      });
      onComplete(result.data as any[]);
   } catch (error) {
      console.error("Error fetch CSV data:", csvPath, error);
   }
};