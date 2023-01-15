from django.shortcuts import render
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from .serializers import ListSerializer
from item.serializers import ItemSerializer
from .models import List
from item.models import Item

class ListsAPIView(APIView):
    ''' HTTP Methods for `/lists/` '''
    queryset = List.objects.all()
    serializer_class = ListSerializer
    permission_classes = [permissions.AllowAny]     # Allow anyone to view this model (no auth required)

    def get(self, request):
        ''' Returns all lists '''
        try:
            lists = self.queryset.all()
            serialize = self.serializer_class(lists, many=True)
            return Response(serialize.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        ''' Creates a new list'''
        try:
            serialize = self.serializer_class(data=request.data)
            if serialize.is_valid():
                serialize.save()
                return Response(serialize.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class ListAPIView(APIView):
    ''' HTTP Methods for `/lists/<list_name>/` '''
    queryset = List.objects.all()
    serializer_class = ItemSerializer
    permission_classes = [permissions.AllowAny]     # Allow anyone to view this model (no auth required)

    def get(self, request, list_name):
        ''' Returns a list with the given name '''
        try:
            list = self.queryset.get(listName=list_name)
            # Get all items that have foreign key as the given list_name
            items = Item.objects.filter(list=list)
            itemSerializer = ItemSerializer(items, many=True)
            result = {'listName': list_name, 'groceries': itemSerializer.data}
            return Response(result, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, list_name):
        ''' Adds a grocery item to the given list '''
        try:
            list = self.queryset.get(listName=list_name)
            itemSerializer = ItemSerializer(data=request.data)
            if itemSerializer.is_valid():
                itemSerializer.save(list=list)
                return Response(itemSerializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(itemSerializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, list_name):
        ''' Deletes a list with the given name '''
        try:
            list = self.queryset.get(listName=list_name)
            list.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class ItemAPIView(APIView):
    ''' HTTP Methods for `/lists/<list_name>/<item_name>/` '''
    queryset = List.objects.all()
    serializer_class = ItemSerializer
    permission_classes = [permissions.AllowAny]     

    def put(self, request, list_name, item_name):
        ''' Updates a grocery item in the given list '''
        try:
            list = self.queryset.get(listName=list_name)
            item = Item.objects.filter(list=list, itemName=item_name)
            if item.exists():
                request.data['list'] = list.pk
                item.update(**request.data)
                return Response(request.data, status=status.HTTP_200_OK)
            else:
                return Response({'error': "Item does not exist"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, list_name, item_name):
        ''' Deletes a grocery item from the given list '''
        try:
            list = self.queryset.get(listName=list_name)
            item = Item.objects.get(list=list, itemName=item_name)
            item.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def clear_list(request, list_name):
    ''' Clears a list with the given name, `/lists/<list_name>/clear/` '''
    try:
        list = List.objects.get(listName=list_name)
        Item.objects.filter(list=list).delete()
        return Response({'details': 'List cleared'}, status=status.HTTP_204_NO_CONTENT)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)