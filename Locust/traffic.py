import json
from random import randrange
from locust import HttpUser, between, task

debug = False

def printDebug(mensaje):
    if debug:
        print(mensaje)


class Reader():
    def __init__(self):
        self.array = []
    
    def pickRandom(self):
        length = len(self.array)

        if length > 0:
            random_index = randrange(0,length-1) if length > 1 else 0
            return self.array.pop(random_index)
        else:
            print(">> Reader : No se encontró ningún valor en el registro")
            return None 
    
    def load(self):
        print(">> Reader: Se está iniciando la lectura del archivo json")
        try:
            with open("traffic.json",'r') as data_file:
                self.array = json.loads(data_file.read())
        except Exception as error:
            print(f'>> Reader: No se cargaron los datos, error: {error}')


class MessageTraffic(HttpUser):
    with_time = between(0.1,0.9)
    reader = Reader()
    reader.load()

    def on_start(self):
        print(">> MessageTraffic: Se inicia el envío de tráfico")
    
    @task
    def PostMessage(self):
        random_data = self.reader.pickRandom()

        if random_data is not None : 
            data_to_send = json.dumps(random_data)
            printDebug(data_to_send)

            self.client.post("/",json=random_data)
        else:
            print(">> MessageTraffic: El envío de tráfico a finalizado, no hay más registros para enviar")
            self.stop(True)

    @task
    def GetMessages(self):
        self.client.get("load.grupo16-proyecto2-vacas-2021.tk")
