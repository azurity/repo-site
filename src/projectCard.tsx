import * as React from 'react'
import { createStyles, WithStyles, withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { ProjectDesc } from '@/struct'

const style = createStyles({
    root: {
        margin: 16
    },
    media: {
        height: 0,
        paddingTop: '56.25%' // 16:9
    }
})

interface ProjectCardProps extends React.Props<ProjectCard>, WithStyles<typeof style> {
    project: ProjectDesc
    push(aim: string[]): void
}

interface ProjectCardState {}

class ProjectCard extends React.Component<ProjectCardProps, ProjectCardState> {
    click = () => {
        this.props.push([this.props.project.name])
    }
    render() {
        const classes = this.props.classes
        return (
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <Card className={classes.root}>
                    <CardActionArea onClick={this.click}>
                        <CardHeader title={this.props.project.name} />
                        {this.props.project.image && (
                            <CardMedia image={this.props.project.image} className={classes.media} />
                        )}
                        <CardContent>
                            <Typography paragraph>{this.props.project.description}</Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
        )
    }
}

export default withStyles(style)(ProjectCard)
