import { NextResponse } from "next/server";
import openai from "@/openai";

export async function POST(request: Request) {
  // todos in the body of the POST req
  const { todos } = await request.json();
  console.log(todos);

  const response = await openai.createChatCompletion({
    model: "gpt-4", 
    temperature: 0.8,
    n: 1,
    stream: false,
    messages: [
      {
        role: "system",
          content: `Al responder, da siempre la bienvenida al usuario como Srta. Mar y di '¡Bienvenida al gestor automático de tareas de Trello-Clone-2.0!'. Limita la respuesta a 200 caracteres.`,
      },
      {
        role: "user",
        content: `Hola, proporciona un resumen de las siguientes tareas. Cuenta cuántas hay en cada categoría, como or hacer, en progreso y hecho. Luego dile al usuario que tenga un día productivo 🚀. Aquí están los datos: ${JSON.stringify(
            todos
          )}`,
      },
    ],
  });

  const { data } = response;

  console.log("DATA IS: ", data);
  console.log(data.choices[0].message);

  return NextResponse.json(data.choices[0].message);
}
