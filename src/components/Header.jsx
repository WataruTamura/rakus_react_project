import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { getUserId, getUserName } from '../reducks/users/selector';
import { signOut } from '../reducks/users/operations';
// import { getUserId } from '../reducks/users/selector';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontSize: 16,
    textAlign: 'right',
    marginRight: 20,
  },
  span: {
    fontSize: 14,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Header = () => {
  // const [user, setUser] = setState('');
  const history = useHistory();
  const handleLink = (path) => history.push(path);
  const selector = useSelector((state) => state);
  const username = getUserName(selector);
  const uid = getUserId(selector);
  // const uid = getUserId(selector);

  // useEffect(() => {
  //   setUser(username);
  // }, [username, setUser]);

  const dispatch = useDispatch();
  // console.log(username);

  // useEffect(() => {
  //   getUserName(selector);
  // }, [uid]);

  const classes = useStyles();

  return (
    <div className={classes.grow}>
      <AppBar position="static" color="default">
        <Toolbar>
          <Link to="/">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/react-teame.appspot.com/o/header_logo.png?alt=media&token=30bc3f87-aa85-47d9-b27f-38e2ff49b6c4"
              alt=""
              width="200px"
            />
          </Link>
          <div className={classes.grow} />
          <Typography variant="h3" className={classes.title}>
            {username}
            <span className={classes.span}>さん</span>
          </Typography>
          <div className={classes.sectionDesktop}>
            {!uid ? (
              ''
            ) : (
              <IconButton
                aria-label="show 17 new notifications"
                color="inherit"
                onClick={() => {
                  handleLink('/cartlist');
                }}
              >
                <Badge badgeContent={3} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            )}
            {!uid ? (
              ''
            ) : (
              <IconButton
                aria-label="show 4 new mails"
                color="inherit"
                onClick={() => {
                  handleLink('/orderhistory');
                }}
              >
                <Badge badgeContent={4} color="secondary">
                  <ImportContactsIcon />
                </Badge>
              </IconButton>
            )}
          </div>
          {/* <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div> */}
        </Toolbar>
      </AppBar>
      {!uid ? (
        <div className="log-button">
          <button
            onClick={() => {
              handleLink('/login');
            }}
          >
            ログイン
          </button>
        </div>
      ) : (
        <div className="log-button">
          <button
            onClick={() => {
              dispatch(signOut());
            }}
          >
            ログアウト
          </button>
        </div>
      )}

      {/* {renderMobileMenu}
      {renderMenu} */}
    </div>
  );
};

export default Header;
