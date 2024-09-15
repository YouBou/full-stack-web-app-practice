from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Product, Purchase, Sales
from .serializers import ProductSerializer, PurchaseSerializer, SaleSerializer, InventorySerializer
from rest_framework import status
from rest_framework.exceptions import NotFound
from django.db.models import F, Value


class ProductView(APIView):
    """
    商品操作に関する関数
    """
    def get_object(self, pk):
        """
        商品操作に関する関数で共通で使用する商品取得関数
        """
        try:
            return Product.objects.get(pk=pk)
        except Product.DoesNotExist:
            raise NotFound
    
    def get(self, request, id=None, format=None):
        """
        商品の一覧もしくは一意の商品を取得する
        """
        if id is None:
            queryset = Product.objects.all()
            serializer = ProductSerializer(queryset, many=True)
        else:
            product = self.get_object(id)
            serializer = ProductSerializer(product)
        return Response(serializer.data, status.HTTP_200_OK)
    
    def post(self, request, format=None):
        """
        商品を登録する
        """
        serializer = ProductSerializer(data=request.data)
        # バリデーションを通過しない場合、例外スロー
        serializer.is_valid(raise_exception=True)
        # 検証したデータの永続化
        serializer.save()
        return Response(serializer.data, status.HTTP_201_CREATED)
    
    def put(self, request, id, format=None):
        product = self.get_object(id)
        serializer = ProductSerializer(instance=product, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status.HTTP_200_OK)

    def delete(self, request, id, format=None):
        product = self.get_object(id)
        product.delete()
        return Response(status = status.HTTP_200_OK)
    
class ProductModelViewSet(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class PurchaseView(APIView):
    def post(self, request, format=None):
        """
        仕入情報を登録する
        """
        serializer = PurchaseSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status.HTTP_201_CREATED)
    
class SalesView(APIView):
    def post(self, request, format=None):
        """
        売上情報を登録する
        """
        serializer = SaleSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status.HTTP_201_CREATED)

class InventoryView(APIView):
    def get(self, request, id=None, format=None):
        """
        仕入れ・売上情報を取得する
        """
        if id is None:
            # 件数が多くなるので商品IDは必ず指定する
            return Response(serializer.data, status.HTTP_400_BAD_REQUEST)
        
        # UNIONするために、それぞれフィールド名を再定義している
        purchase = Purchase.objects.filter(product_id=id).prefetch_related('product').values(
            "id",
            "quantity",
            type=Value('1'),
            date=F('sales_date'),
            unit=F('product__price')
        )
        sales = Sales.objects.filter(product_id=id).prefetch_related('product').values(
            "id",
            "quantity",
            type=Value('2'),
            date=F('sales_date'),
            unit=F('product__price')
        )
        queryset = purchase.union(sales).order_by(F("date"))
        serializer = InventorySerializer(queryset, many=True)

        return Response(serializer.data, status.HTTP_200_OK)
