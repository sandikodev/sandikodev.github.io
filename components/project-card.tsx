import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type Project = {
  title: string
  description: string
  imageAlt: string
  imageUrl: string
  github?: string
  demo?: string
}

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="h-full overflow-hidden transition-transform hover:-translate-y-0.5 focus-within:-translate-y-0.5 transition-shadow dark:hover:[box-shadow:0_0_18px_var(--color-primary)] dark:focus-within:[box-shadow:0_0_18px_var(--color-primary)]">
      <img
        src={project.imageUrl || "/placeholder.svg?height=160&width=320&query=project cover"}
        alt={project.imageAlt}
        loading="lazy"
        decoding="async"
        className="h-40 w-full object-cover transition-transform hover:scale-[1.02]"
      />
      <CardHeader>
        <CardTitle className="text-base">{project.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-foreground/80">{project.description}</p>
      </CardContent>
      <CardFooter className="flex gap-2">
        {project.github && (
          <Button asChild size="sm" variant="secondary">
            <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label="Lihat di GitHub">
              GitHub
            </a>
          </Button>
        )}
        {project.demo && (
          <Button asChild size="sm">
            <a href={project.demo} target="_blank" rel="noopener noreferrer" aria-label="Buka Demo">
              Demo
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
