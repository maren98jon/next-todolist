export const dynamic = 'force-dynamic';
export const revalidate = 0;




import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/todos";



export const metadata = {
 title: 'Listado de Todos',
 description: 'Listado de Todos',
};

export default async function RestTodosPage() {

  // useEffect(() => {
  //   fetch('/api/todos')
  //     .then( resp => resp.json() )
  //     .then( console.log );

  // }, [])

  const todos = await prisma.todo.findMany({ orderBy: { description: 'asc'}});

  return (
    <div>
      {/* TODO: formulario para agregar TODOs */}
      <div className="w-full px-3 mx-5 mb-5">
        <NewTodo />
      </div>
      
      <TodosGrid todos={ todos } />
    </div>
  );
}