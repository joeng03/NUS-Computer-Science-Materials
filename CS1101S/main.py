import requests

base_url = "https://api.sourceacademy.nus.edu.sg/v2/courses/41/assessments/"
headers = {"authorization": "Bearer YOUR_JWT_TOKEN"}

f = open("answer.txt", "w", encoding="utf-8")
assessment_list = requests.get(base_url, headers=headers).json()

for assessment in assessment_list:
    assessment_id = str(assessment["id"])
    assessment = requests.get(base_url+assessment_id, headers=headers).json()
    assessment_type = assessment["type"]
    assessment_title = assessment["title"]
    if (assessment_type == "Studio Performance" or assessment_type == "Contests"):
        continue
    print(assessment_id)
    f.write(assessment_type + ": " + assessment_title + '\n\n')
    cnt = 1
    for question in assessment["questions"]:
        f.write("//Question " + str(cnt) + '\n')
        f.write(str(question["answer"]) + '\n\n')
        cnt += 1
    f.write("----------------------------------------------------------------------------------------------------\n\n")
