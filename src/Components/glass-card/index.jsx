import { makeStyles } from '@material-ui/core/styles'

const inputStyles = makeStyles(() => ({
  root: {
    '& .text': {
      fontSize: '14px',
    },
  },
  darkForeground: {
    background: '#00000050!important',
  },
}))

const GlassCard = ({
  children,
  width,
  height,
  color,
  margin,
  dark = false,
}) => {
  const classes = inputStyles()
  return (
    <div
      className={`glass-card ${classes.root}`}
      style={{
        maxWidth: width, height, color, margin,
      }}
    >
      <div className="glass-background" />
      <div
        className={`glass-foreground ${dark ? classes.darkForeground : ''}`}
      />
      <span className="glass-content">{children}</span>
    </div>
  )
}
export default GlassCard
