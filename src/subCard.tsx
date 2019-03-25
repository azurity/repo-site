import * as React from 'react'
import { createStyles, WithStyles, withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { SubItem } from '@/struct'

const style = createStyles({
    root: {
        padding: 8
    }
})

interface SubCardProps extends React.Props<SubCard>, WithStyles<typeof style> {
    item: SubItem
    push(aim: string): void
}

interface SubCardState {}

class SubCard extends React.Component<SubCardProps, SubCardState> {
    click = () => {
        this.props.push(this.props.item.name)
    }
    render() {
        const classes = this.props.classes
        return (
            <Grid item xs={12} sm={6} md={4} lg={3} className={classes.root}>
                <Card>
                    <CardActionArea onClick={this.click}>
                        <CardHeader title={this.props.item.name} />
                        <CardContent>
                            {this.props.item.version && (
                                <Typography inline color="textSecondary">
                                    {this.props.item.version}
                                </Typography>
                            )}
                            {this.props.item.version && this.props.item.license && (
                                <span>&ensp;</span>
                            )}
                            {this.props.item.license && (
                                <Typography inline color="textSecondary">
                                    {this.props.item.license}
                                </Typography>
                            )}
                            <Typography>{this.props.item.description}</Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
        )
    }
}

export default withStyles(style)(SubCard)
