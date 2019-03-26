import * as React from 'react'
import {
    createStyles,
    WithStyles,
    withStyles,
    createMuiTheme,
    MuiThemeProvider
} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import Typography from '@material-ui/core/Typography'
import { grey } from '@material-ui/core/colors'
import LeftSideBar from '@/leftSideBar'
import ProjectCard from '@/ProjectCard'
import Project from '@/project'
import * as param from '../template-param.json'
import { ProjectDesc } from '@/struct'

const style = createStyles({
    basic: {
        padding: 8
    },
    footer: {
        padding: 8,
        backgroundColor: grey[100]
    }
})

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
        fontFamily: ["'Ubuntu'", "'Noto Sans SC'"].join(',')
    }
})

interface AppProps extends React.Props<App>, WithStyles<typeof style> {}

interface AppState {
    path: string[]
    projects: ProjectDesc[]
}

class App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props)
        let path = (searchParse(window.location.search).url || '').split(',')
        if (path[0] === '') path = []
        this.state = {
            path: path,
            projects: []
        }
        fetch('projects.json')
            .then((res) => {
                if (!res.ok) throw res.status
                return res.json()
            })
            .then((data: ProjectDesc[]) => {
                this.setState({
                    projects: data
                })
            })
            .catch((error) => {
                alert(`获取项目列表失败: ${error}`)
            })
    }
    push = (aim: string[]) => {
        window.history.pushState(null, '', `?url=${aim.join(',')}`)
        this.setState({
            path: aim
        })
    }
    render() {
        const classes = this.props.classes
        return (
            <MuiThemeProvider theme={theme}>
                <Grid container>
                    <Hidden xsDown>
                        <Grid item sm={3} md={2} className={classes.basic}>
                            <LeftSideBar
                                repos={this.state.projects.map((it) => it.name)}
                                push={this.push}
                            />
                        </Grid>
                    </Hidden>
                    {this.state.path.length == 0 ? (
                        <Grid item xs={12} sm={9} md={8} className={classes.basic}>
                            <Typography component="h1" variant="h2" align="left" gutterBottom>
                                {param.main.title}
                            </Typography>
                            <Typography align="left" gutterBottom>
                                {param.main.description}
                            </Typography>
                            <Grid container>
                                {this.state.projects.map((it) => (
                                    <ProjectCard key={it.name} project={it} push={this.push} />
                                ))}
                            </Grid>
                        </Grid>
                    ) : (
                        <Grid item xs={12} sm={9} md={8} className={classes.basic}>
                            <Project
                                key={this.state.path.join(',')}
                                path={this.state.path}
                                push={this.push}
                            />
                        </Grid>
                    )}
                    <Hidden smUp>
                        <Grid item xs={12} className={classes.footer}>
                            <LeftSideBar
                                repos={this.state.projects.map((it) => it.name)}
                                push={this.push}
                            />
                        </Grid>
                    </Hidden>
                </Grid>
            </MuiThemeProvider>
        )
    }
}

function searchParse(search: string) {
    let result: { [x: string]: string } = {}
    for (let it of search.slice(1).split('&')) {
        let stage = it.split('=')
        result[stage[0]] = stage[1]
    }
    return result
}

export default withStyles(style)(App)
