import * as React from 'react'
import { createStyles, WithStyles, withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import SubCard from '@/subCard'
import { ProjectDetail } from '@/struct'
import MD from '@/md'

const style = createStyles({
    basic: {
        padding: 8
    },
    buttonText: {
        textTransform: 'none'
    }
})

interface ProjectProps extends React.Props<Project>, WithStyles<typeof style> {
    path: string[]
    push(aim: string[]): void
}

interface ProjectState {
    detail?: ProjectDetail
    html: string
}

class Project extends React.Component<ProjectProps, ProjectState> {
    constructor(props: ProjectProps) {
        super(props)
        this.state = {
            detail: undefined,
            html: ''
        }
        fetch(props.path.join('/') + '/detail.json')
            .then((res) => {
                if (!res.ok) throw res.status
                return res.json()
            })
            .then((data: ProjectDetail) => {
                this.setState({
                    detail: data
                })
            })
            .catch((error) => {
                alert(`获取项目详情失败: ${error}`)
            })
    }
    componentDidMount() {
        fetch(this.props.path.join('/') + '/index.md')
            .then((res) => {
                if (!res.ok) throw res.status
                return res.text()
            })
            .then((text: string) => {
                this.setState({
                    html: MD.render(text)
                })
            })
            .catch((error) => {
                alert(`获取项目文本失败: ${error}`)
            })
    }
    click = (e: React.MouseEvent<HTMLElement>) => {
        if (e.currentTarget.dataset.url) {
            window.open(e.currentTarget.dataset.url)
        }
    }
    push = (aim: string) => {
        let path = this.props.path.map((it) => it)
        path.push(aim)
        this.props.push(path)
    }
    render() {
        const classes = this.props.classes
        const detail = this.state.detail
        return (
            <div>
                {detail && (
                    <Typography component="h1" variant="h2" align="left" gutterBottom>
                        {detail.name}
                    </Typography>
                )}
                {detail && detail.type == 'project' && (
                    <Grid container>
                        {detail.subItem.map((item) => (
                            <SubCard key={item.name} item={item} push={this.push} />
                        ))}
                    </Grid>
                )}
                {detail && detail.type == 'repo' && (
                    <div>
                        {detail.version.value && (
                            <Button onClick={this.click} data-url={detail.version.url}>
                                version&ensp;
                                <Typography
                                    component="span"
                                    color="textSecondary"
                                    className={classes.buttonText}>
                                    {detail.version.value}
                                </Typography>
                            </Button>
                        )}
                        {detail.license.name && (
                            <Button onClick={this.click} data-url={detail.license.url}>
                                license&ensp;
                                <Typography
                                    component="span"
                                    color="textSecondary"
                                    className={classes.buttonText}>
                                    {detail.license.name}
                                </Typography>
                            </Button>
                        )}
                        {detail.repository.repoName && (
                            <Button onClick={this.click} data-url={detail.repository.url}>
                                repository&ensp;
                                <Typography
                                    component="span"
                                    color="textSecondary"
                                    className={classes.buttonText}>
                                    {detail.repository.repoName}
                                </Typography>
                            </Button>
                        )}
                    </div>
                )}
                <div dangerouslySetInnerHTML={{__html:this.state.html}}></div>
            </div>
        )
    }
}

export default withStyles(style)(Project)
