import json
import boto3


# Cria uma conexão com o serviço DynamoDB
dynamodb = boto3.resource('dynamodb')
            
# Cria um objeto do tipo tabela do DynamoDB
table = dynamodb.Table('users')

def get_data():
    
    # Cria uma conexão com o serviço DynamoDB
    dynamodb_get = boto3.client('dynamodb')
            
    # recupera todos os itens da tabela
    response = dynamodb_get.scan(TableName='users')
        
    # lista vazia para armazenar os itens
    items = []
    
    # adiciona cada item à lista
    for item in response['Items']:
        items.append(item)   
        
    return items
    
    
def post_item(payload):    
            
    # Define os valores do item que será inserido
    item = {
        'id': payload['id'],
        'userName': payload['userName'],
        'age': payload['age'],
        'email': payload['email']
        }
            
    # adiciona o item à tabela
    table.put_item(Item=item)
    
    return "User added!"
    
def update_item(id_user, data):
    
    # Informe os novos valores para atualizar
    expression_attribute_values = {':age': data['age'], ':email': data['email'], ':userName': data['userName']}

    # Adicione a expressão de atualização para atualizar os valores dos atributos
    update_expression = 'SET age = :age, email = :email, userName = :userName'

    # Atualize o item na tabela
    table.update_item(
        Key={'id': id_user},
        UpdateExpression=update_expression,
        ExpressionAttributeValues=expression_attribute_values
    )
    
    return 'User updated'
    
def delete_user(id_user):
    
    table.delete_item(
        Key={
            'id': id_user
        }
    )
    
    return 'User deleted'
    
    