from app.schemas.historia import Frase, Historia
from app.schemas.tentativa import Tentativa

# Nesta sprint os dados ficam em memória e voltam ao estado inicial quando a API reinicia

_historias_iniciais = [
    ("The Little Red Hen", "Iniciante", "Profª Carla", [
        ("Once upon a time, there was a little red hen.", True),
        ("She lived on a farm with a dog, a cat and a duck.", True),
        ("One day, she found some seeds of wheat.", False),
        ("Who will help me plant the seeds?", True),
        ("Not I, said the dog. Not I, said the cat.", False),
    ]),
    ("Tom and the Big Tree", "Iniciante", "Profª Carla", [
        ("Tom has a big tree in his garden.", True),
        ("Every morning, birds sing in the tree.", True),
        ("Tom likes to read his books under the tree.", True),
        ("It is his favorite place in the world.", False),
    ]),
    ("A Rainy Day", "Básico", "Profª Carla", [
        ("It was raining, so Lucy could not go outside.", True),
        ("She looked through the window and felt sad.", True),
        ("Then her brother brought a box of colored pencils.", False),
        ("Together, they drew a bright yellow sun.", True),
    ]),
    ("The Lost Puppy", "Básico", "Prof. Marcos", [
        ("A small brown puppy was lost in the park.", True),
        ("He was hungry and he wanted to go home.", True),
        ("A girl saw the name on his collar.", False),
        ("She called the number and his family came running.", True),
    ]),
    ("My First Day at School", "Intermediário", "Prof. Marcos", [
        ("I was nervous when I walked into the classroom.", True),
        ("The teacher smiled and showed me my desk.", True),
        ("A boy named Leo asked me if I wanted to share his crayons.", True),
        ("By the end of the day, we were best friends.", False),
    ]),
    ("The Moon and the Ocean", "Intermediário", "Profª Carla", [
        ("Every night, the moon looked down at the ocean.", True),
        ("The waves danced when the moon was full and bright.", True),
        ("The ocean thought the moon was the most beautiful thing in the sky.", False),
        ("And the moon thought the same about the ocean.", True),
    ]),
]

historias: list[Historia] = []
tentativas: list[Tentativa] = []

id_frase = 0
for id_historia, (titulo, nivel, autor, frases) in enumerate(_historias_iniciais, start=1):
    lista_frases = []
    for texto, praticar in frases:
        id_frase += 1
        lista_frases.append(Frase(id=id_frase, texto=texto, praticar=praticar))
    historias.append(Historia(id=id_historia, titulo=titulo, nivel=nivel, autor=autor, frases=lista_frases))
