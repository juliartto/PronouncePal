import type { Historia } from "@/types";

export const historiasMock: Historia[] = [
  {
    id: 1,
    titulo: "The Little Red Hen",
    nivel: "Iniciante",
    autor: "Profª Carla",
    frases: [
      { id: 1, texto: "Once upon a time, there was a little red hen.", praticar: true },
      { id: 2, texto: "She lived on a farm with a dog, a cat and a duck.", praticar: true },
      { id: 3, texto: "One day, she found some seeds of wheat.", praticar: false },
      { id: 4, texto: "Who will help me plant the seeds?", praticar: true },
      { id: 5, texto: "Not I, said the dog. Not I, said the cat.", praticar: false },
    ],
  },
  {
    id: 2,
    titulo: "Tom and the Big Tree",
    nivel: "Iniciante",
    autor: "Profª Carla",
    frases: [
      { id: 6, texto: "Tom has a big tree in his garden.", praticar: true },
      { id: 7, texto: "Every morning, birds sing in the tree.", praticar: true },
      { id: 8, texto: "Tom likes to read his books under the tree.", praticar: true },
      { id: 9, texto: "It is his favorite place in the world.", praticar: false },
    ],
  },
  {
    id: 3,
    titulo: "A Rainy Day",
    nivel: "Básico",
    autor: "Profª Carla",
    frases: [
      { id: 10, texto: "It was raining, so Lucy could not go outside.", praticar: true },
      { id: 11, texto: "She looked through the window and felt sad.", praticar: true },
      { id: 12, texto: "Then her brother brought a box of colored pencils.", praticar: false },
      { id: 13, texto: "Together, they drew a bright yellow sun.", praticar: true },
    ],
  },
  {
    id: 4,
    titulo: "The Lost Puppy",
    nivel: "Básico",
    autor: "Prof. Marcos",
    frases: [
      { id: 14, texto: "A small brown puppy was lost in the park.", praticar: true },
      { id: 15, texto: "He was hungry and he wanted to go home.", praticar: true },
      { id: 16, texto: "A girl saw the name on his collar.", praticar: false },
      { id: 17, texto: "She called the number and his family came running.", praticar: true },
    ],
  },
  {
    id: 5,
    titulo: "My First Day at School",
    nivel: "Intermediário",
    autor: "Prof. Marcos",
    frases: [
      { id: 18, texto: "I was nervous when I walked into the classroom.", praticar: true },
      { id: 19, texto: "The teacher smiled and showed me my desk.", praticar: true },
      { id: 20, texto: "A boy named Leo asked me if I wanted to share his crayons.", praticar: true },
      { id: 21, texto: "By the end of the day, we were best friends.", praticar: false },
    ],
  },
  {
    id: 6,
    titulo: "The Moon and the Ocean",
    nivel: "Intermediário",
    autor: "Profª Carla",
    frases: [
      { id: 22, texto: "Every night, the moon looked down at the ocean.", praticar: true },
      { id: 23, texto: "The waves danced when the moon was full and bright.", praticar: true },
      { id: 24, texto: "The ocean thought the moon was the most beautiful thing in the sky.", praticar: false },
      { id: 25, texto: "And the moon thought the same about the ocean.", praticar: true },
    ],
  },
];
