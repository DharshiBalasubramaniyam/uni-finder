export type OptionType = { 
   value: string; 
   label: string 
};

export type CourseDataType = {
   code: string;
   course: string;
   university: string;
   stream: string;
   gampaha: string;
   colombo: string;
   kaluthara: string;
   galle: string;
   matara: string;
   hambantota: string;
   jaffna: string;
   kilinochchi: string;
   mallaitivu: string;
   vavuniya: string;
   mannar: string;
   anuradhapura: string;
   polonnaruwa: string;
   badulla: string;
   monaragala: string;
   nuwara_eliya: string;
   kandy: string;
   matale: string;
   kurunegala: string;
   puttalam: string;
   ratnapura: string;
   trincomalee: string;
   batticaloa: string;
   ampara: string;
   kegalle: string;
   course_code: string;
   uni_code: string;
   subjects: string;
   [key: string]: string;
}
export type TableDataType = {
   unicode: string;
   courseCode: string;
   courseName: string;
   university: string;
   zscore: string;
   isHidden: boolean
}

export enum FilterType {
   STREAM,
   ZSCORE,
   UNIVERSITY,
   KEYWORD,
   DISTRICT,
   SELECTZ,
   SUBJECTS
}

export type TableColumn = { columnName: string; show: boolean }