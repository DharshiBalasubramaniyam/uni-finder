```py
detail = {}

# medium, degree, duration

json format:
[
    course_code1: {
        medium: [english, tamil],
        degrees: [
            university_of_example: [
                {
                  name: bsc hons in physical_science,
                  duration: 3
                },
                {
                  name: bsc hons in physical_science hons,
                  duration: 4
                }
            ],
            university_of_example2: [
                {
                  name: bsc hons in physical_science hons,
                  duration: 4
                }
            ]
        ]
    },
    
]

csv format:
code,medium,university,degree,duration
001,tamil|english,university_of_example,bsc hons in physical_science|bsc hons in physical_science hons,3|4
001,tamil|english,university_of_example2,bsc hons in physical_science,4
```


```
001: {
   subject1: {
      names: [physics, biology],
      min_results: [S, S]
   },
   subject2: {
      names: [combined_mathematics],
      min_results: [C]
   },
   subject1: {
      names: [chemistry],
      min_results: [S]
   }
}

code, subject1_name, subject1_result, subject2_name, subject2_result, subject13_name, subject3_result
```

