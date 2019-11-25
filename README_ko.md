![Primary_logo](https://user-images.githubusercontent.com/13705536/69392188-8e89e780-0d18-11ea-995d-d7373d54b055.png)
# NUGUMATE: 당신을 알고, 공감하는 NUGUMate

## 소개
 인공지능 스피커에 대한 수요와 인공지능 스피커를 단순한 기기가 아닌 대화의 대상이라고 생각하는 사용자들이 증가하고 있다. 이에 따라 심리적 위안을 제공해 줄 수 있는 인공 지능 스피커의 서비스에 대한 수요가 증가하고 있다. 

 본 프로젝트에서는 애플리케이션에 일기를 작성하고 서버에 전송한 다음, 서버는 해당 일기의 내용, 사용자가 지정한 날짜, 그리고 사용자 정보를 데이터베이스에 저장한다. 그런 다음, 또 다른 서버와 연동된 감정 분석 모델을 이용하여 작성한 일기를 불러온 후, 해당 일기의 각 문장에 담긴 감정을 긍정 혹은 부정으로 분류한다. 분류 결과를 해당 일기가 저장된 곳에 추가한다. 
 
 이후, 사용자가 NUGU 디바이스에 “아리아, 오늘 하루는 어땠어?” 와 같이 일상의 대화를 시작할 경우 NUGU 디바이스는 “주인님의 감정이 안 좋은 것 같아서 저도 우울했어요.” 와 같이 감정 분석 모델의 결과를 바탕으로 사용자의 감정에 공감할 수 있는 답변을 제공한다. 사용자는 조회한 날짜 당일과 더불어 조회한 날짜에 해당하는 주와 달에 대해서도 동일한 대화를 진행할 수 있다. 즉, “아리아, 이번 주는 어땠어?” 혹은 “아리아, 이번 달은 어땠어?” 와 같은 질문에 대해서도 동일한 방식의 답을 제공한다.    

## 프로젝트 내부 인터랙션
![brief_interaction_database](./images/brief_interaction_database.png)  

## 기타 참고 링크
  - 프로젝트 소개서 : https://www.overleaf.com/read/mgsvwfwgvqjb
  - 해당 프로젝트의 서버 Github : https://github.com/flyc4/NUGUMATE-Server  
  - 해당 프로젝트의 모델 Github : https://github.com/hyun1014/NUGUMATE_Model  
  - README 영문 : https://github.com/cngjsskaisme/NUGUMate/blob/master/README.md
