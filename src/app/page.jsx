import TaskCard from "@/components/TaskCard";
import { prisma } from "@/libs/prisma";

async function loadTasks() {
  /* const res = await fetch(`${process.env.API_URL}tasks`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data; */
  return await prisma.task.findMany()
}

//export const revalidate = 1;
export const dynamic = 'force-dynamic';

async function HomePage() {
  const tasks = await loadTasks();
  return (
    <section className="container mx-auto py-5">
      <div className="grid grid-cols-3 gap-3">
        {tasks.map((task) => (
          <TaskCard task={task} key={task.id}></TaskCard>
        ))}
      </div>
    </section>
  );
}

export default HomePage;
