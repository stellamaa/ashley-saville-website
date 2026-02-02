import { getProjects } from "@/sanity/sanity-utils";
import Image from "next/image";
export default async function Home() {

  const projects = await getProjects();


  return <div> 
    {projects.map((project) => (
      <div key={project._id}>
        <h2>{project.name}</h2>
      
       {project.image && (
         <Image
          src={project.image}
          alt={project.name} 
          width={100} height={100} 
          className="object-cover rounded-lg border border-gray-200"
          /> )}
      </div>
    ))}
  </div>
  
}