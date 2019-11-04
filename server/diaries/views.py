from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, Http404  
from django.views.decorators.csrf import csrf_exempt

def index(request):
    data = [{"Greeting" : "Hello1"}, {"Greeting" : "Hello2"}]
    print("index")
    return JsonResponse({
      'message' : 'Hello Django',
        'items' : data
    }) 

## GET parameter test
#def test1(request,echo):
#    print("test")
#    data = [{"Greeting" : "Heo1"}, {"Greeting" : "Hello2"}]
#    return JsonResponse({
#      'message' : echo,
#        'items' : data
#    }) 

# POST test
@csrf_exempt
def test(request): 
    return JsonResponse({
      'message' : request.POST['message'],
    })