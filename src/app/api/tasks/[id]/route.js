const { NextResponse } = require("next/server");
const { prisma } = require("@/libs/prisma");

export async function GET(request, { params }) {
  const task = await prisma.task.findUnique({
    where: {
      id: Number(params.id),
    },
  });
  return NextResponse.json(task);
}

export function POST(request, { params }) {
  return NextResponse.json("Creando tarea " + params.id);
}

export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const taskUpdate = await prisma.task.update({
      where: {
        id: Number(params.id),
      },
      data: data,
    });
    return NextResponse.json(taskUpdate);
  } catch (error) {
    return NextResponse.json(
      { error: "No se pudo actualizar la tarea" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const taskRemove = await prisma.task.delete({
      where: {
        id: Number(params.id),
      },
    });
    return NextResponse.json(taskRemove);
  } catch (error) {
    return NextResponse.json(
      { error: "No se pudo eliminar la tarea" },
      { status: 500 }
    );
  }
}
