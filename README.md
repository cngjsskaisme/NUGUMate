# NUGUMATE: NUGU speaker empathizes with your feelings 
 You can also see the our latest description of this project at https://www.overleaf.com/project/5dc7a70e54333100014e340e .  
 
 You can also see the server of this project at https://github.com/flyc4/NUGUMATE-Server  
 You can also see the model of this project at https://github.com/flyc4/NUGUMATE-Model  
 
![brief_interaction_database](./images/brief_interaction_database.png)  


English: 
Both demands for AI speaker and people who regard AI speakers as an interlocutor are increasing. For these reasons, the demand for the service that AI speakers can provide comfort is increasing. 
A user keeps a diary in the application, sends it to the server, and the server saves the contents of the diary, date that the user chose and the user information to the database. Then, the sentiment analysis model linked with another server(the model server) loads the diary to classify the emotions of each sentence of the diary into positive or negative and append the result to the database where the diary stored.
After that, when the user starts a daily conversation with the NUGU device, such as "Aria, how was your day?", then it requests a proper answer to the server and the server gives the answer to the speaker based on the result of the model that is saved in the database, such as “I was depressed because you looked depressed”, and the speaker answers it to the user.  

Korean(한국어): 
인공지능 스피커에 대한 수요와 인공지능 스피커를 단순한 기기가 아닌 대화의 대상이라고 생각하는 사용자들이 증가하고 있다. 이에 따라 심리적 위안을 제공해 줄 수 있는 인공 지능 스피커의 서비스에 대한 수요가 증가하고 있다. 
본 프로젝트에서는 애플리케이션에 일기를 작성하고 서버에 전송한 다음, 서버는 해당 일기의 내용, 사용자가 지정한 날짜, 그리고 사용자 정보를 데이터베이스에 저장한다. 그런 다음, 또 다른 서버와 연동된 감정 분석 모델을 이용하여 작성한 일기를 불러온 후, 해당 일기의 각 문장에 담긴 감정을 긍정 혹은 부정으로 분류한다. 분류 결과를 해당 일기가 저장된 곳에 추가한다. 이 후, 사용자가 NUGU 디바이스에 “아리아, 오늘 하루는 어땠어?” 와 같이 일상의 대화를 시작할 경우 NUGU 디바이스는 “주인님의 감정이 안 좋은 것 같아서 저도 우울했어요.” 와 같이 감정 분석 모델의 결과를 바탕으로 사용자의 감정에 공감할 수 있는 답변을 제공한다. 사용자는 조회한 날짜 당일과 더불어 조회한 날짜에 해당하는 주와 달에 대해서도 동일한 대화를 진행할 수 있다. 즉, “아리아, 이번 주는 어땠어?” 혹은 “아리아, 이번 달은 어땠어?” 와 같은 질문에 대해서도 동일한 방식의 답을 제공한다.     







 
