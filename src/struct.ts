export interface ProjectDesc {
    name: string
    description: string
    image?: string
}

export interface SubItem {
    name: string
    description: string
    version: string
    license: string
}

interface ProjectDetailProject {
    name: string
    type: 'project'
    subItem: SubItem[]
}

interface ProjectDetailRepo {
    name: string
    type: 'repo'
    version: {
        value: string
        url: string
    }
    license: {
        name: string
        url: string
    }
    repository: {
        repoName: string
        url: string
    }
}

export type ProjectDetail = ProjectDetailProject | ProjectDetailRepo
