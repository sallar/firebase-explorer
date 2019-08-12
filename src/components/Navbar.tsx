import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import HomeIcon from "@material-ui/icons/Home";
import { AppContext } from "./Context";
import { parsePath } from "../utils/path";

const Input = styled.input`
  height: 40px;
  width: 100%;
  display: block;
  border: 1px solid red;
  border-radius: 5px;
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(1, 2)
    },
    link: {
      display: "flex"
    },
    icon: {
      marginRight: theme.spacing(0.5),
      width: 20,
      height: 20
    }
  })
);

const Navbar: React.FunctionComponent = () => {
  const { onSelectPath, path } = useContext(AppContext);
  const [currentPath, setCurrentPath] = useState(path);
  const classes = useStyles();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPath(e.target.value);
  };
  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSelectPath(currentPath);
    }
  };
  const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  useEffect(() => {
    if (path !== currentPath) {
      setCurrentPath(path);
    }
  }, [path]);

  const parts = parsePath(path);

  console.log(parts);

  // return (
  //   <Input
  //     type="text"
  //     onChange={onChange}
  //     onKeyPress={onKeyPress}
  //     onFocus={onFocus}
  //     value={currentPath}
  //   />
  // );
  return (
    <div className={classes.root}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {parts.map(part => (
          <Link
            onClick={() => onSelectPath(part.path)}
            key={part.path}
            color="inherit"
            className={classes.link}
          >
            {part.key === "/" ? <HomeIcon /> : part.key}
          </Link>
        ))}
      </Breadcrumbs>
    </div>
  );
};

export default Navbar;
