import * as React from 'react'
import { createStyles, WithStyles, withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import Hidden from '@material-ui/core/Hidden'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import * as param from '../template-param.json'

const style = createStyles({
    footer: {
        display: 'inline-block',
        width: '50%'
    },
    name: {
        whiteSpace: 'nowrap'
    }
})

interface LeftSideBarProps extends React.Props<LeftSideBar>, WithStyles<typeof style> {
    repos: string[]
    push(aim: string[]): void
}

interface LeftSideBarState {
    hasLogo: boolean
    dialogShow: boolean
    url: string
}

class LeftSideBar extends React.Component<LeftSideBarProps, LeftSideBarState> {
    constructor(props: LeftSideBarProps) {
        super(props)
        this.state = {
            hasLogo: true,
            dialogShow: false,
            url: ''
        }
    }
    click = (e: React.MouseEvent<HTMLElement>) => {
        switch (e.currentTarget.dataset.type) {
            case 'link':
                window.open(e.currentTarget.dataset.aim)
                break
            case 'qrcode':
                this.setState({
                    dialogShow: true,
                    url: e.currentTarget.dataset.aim || ''
                })
                break
        }
    }
    clickRepo = (e: React.MouseEvent<HTMLElement>) => {
        this.props.push([e.currentTarget.dataset.aim || ''])
    }
    close = () => {
        this.setState({
            dialogShow: false,
            url: ''
        })
    }
    render() {
        const classes = this.props.classes
        return (
            <div>
                <Hidden xsDown>
                    {this.state.hasLogo && (
                        <Button
                            fullWidth
                            onClick={() => {
                                this.props.push([])
                            }}>
                            <img
                                src="/logo.png"
                                onError={() => {
                                    this.setState({ hasLogo: false })
                                }}
                            />
                        </Button>
                    )}
                    {this.props.repos.map((repo) => (
                        <ListItem key={repo} button onClick={this.clickRepo} data-aim={repo}>
                            <ListItemText
                                primary={repo}
                                primaryTypographyProps={{
                                    color: 'textSecondary',
                                    align: 'center'
                                }}
                            />
                        </ListItem>
                    ))}
                </Hidden>
                {param.footer.map((item) => (
                    <List
                        key={item.name}
                        subheader={
                            <Typography variant="h6" align="center">
                                {item.name}
                            </Typography>
                        }>
                        {item.list.map((item) => (
                            <ListItem
                                key={item.name}
                                className={classes.footer}
                                button
                                onClick={this.click}
                                data-type={item.type}
                                data-aim={item.url}>
                                <ListItemText
                                    primary={item.name}
                                    primaryTypographyProps={{
                                        color: 'textSecondary',
                                        align: 'center'
                                    }}
                                />
                            </ListItem>
                        ))}
                    </List>
                ))}
                {param.copyright.author && (
                    <Typography align="center" color="textSecondary">
                        copyright &copy; {new Date().getFullYear()}{' '}
                        <span className={classes.name}>{param.copyright.author}</span>
                    </Typography>
                )}
                {param.copyright.author && param.copyright.license && (
                    <a href={param.copyright.licenseURL}>
                        <Typography align="center" color="textSecondary">
                            use {param.copyright.license} license
                        </Typography>
                    </a>
                )}
                <Dialog open={this.state.dialogShow} onClose={this.close}>
                    <DialogContent>
                        <img src={this.state.url} alt="can't load the QRcode." />
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(style)(LeftSideBar)
