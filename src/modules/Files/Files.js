import React from "react";
import Layout from "../Layout/NewLayout";
import FolderIcon from '@material-ui/icons/Folder';
import { Grid, ListItem,List, ListItemText, Typography,ListItemIcon } from "@material-ui/core";
import "./files.css";

export default function Files() {
  return (
    <Layout>
      <Grid container className="filecontainer">
        <Grid item xs={12}>
          <Typography varient="h3" className="heading">
            Students can access shared files here
          </Typography>
        </Grid>
        <Grid item xs={12}>
            <List>
                <ListItem>
                <ListItemIcon>
                    <FolderIcon />
                  </ListItemIcon>
                    <ListItemText>
                        <a href="https://drive.google.com/uc?export=download&amp;id=1a0hnc6_CfreUwdNbLZeROeRH1A8qrthT" target="_blank"  rel="noreferrer noopener" download>File1</a>
                    </ListItemText>
                </ListItem>
                <ListItem>
                <ListItemIcon>
                    <FolderIcon />
                  </ListItemIcon>
                    <ListItemText>
                        <a href="https://drive.google.com/uc?export=download&amp;id=1kHv83xjYCy_W6XGOVmN5ZBQ8tw18vGla" target="_blank"  rel="noreferrer noopener">File2</a>
                    </ListItemText>
                </ListItem>
                <ListItem>
                <ListItemIcon>
                    <FolderIcon />
                  </ListItemIcon>
                    <ListItemText>
                        <a href="https://drive.google.com/uc?export=download&amp;id=1kHv83xjYCy_W6XGOVmN5ZBQ8tw18vGla"  target="_blank"  rel="noreferrer noopener">File3</a>
                    </ListItemText>
                </ListItem>
                <ListItem>
                <ListItemIcon>
                    <FolderIcon />
                  </ListItemIcon>
                    <ListItemText>
                        <a href="https://drive.google.com/uc?export=download&amp;id=1kHv83xjYCy_W6XGOVmN5ZBQ8tw18vGla"  target="_blank"  rel="noreferrer noopener">File4</a>
                    </ListItemText>
                </ListItem>
                <ListItem>
                <ListItemIcon>
                    <FolderIcon />
                  </ListItemIcon>
                    <ListItemText>
                        <a href="https://drive.google.com/uc?export=download&amp;id=1kHv83xjYCy_W6XGOVmN5ZBQ8tw18vGla"  target="_blank"  rel="noreferrer noopener">File5</a>
                    </ListItemText>
                </ListItem>
                 <ListItem>
                <ListItemIcon>
                    <FolderIcon />
                  </ListItemIcon>
                    <ListItemText>
                        <a href="https://drive.google.com/uc?export=download&amp;id=1kHv83xjYCy_W6XGOVmN5ZBQ8tw18vGla" target="_blank"  rel="noreferrer noopener">File6</a>
                    </ListItemText>
                </ListItem>
                <ListItem>
                <ListItemIcon>
                    <FolderIcon />
                  </ListItemIcon>
                    <ListItemText>
                        <a href="https://drive.google.com/uc?export=download&amp;id=1kHv83xjYCy_W6XGOVmN5ZBQ8tw18vGla" target="_blank"  rel="noreferrer noopener">File7</a>
                    </ListItemText>
                </ListItem>
                <ListItem>
                <ListItemIcon>
                    <FolderIcon />
                  </ListItemIcon>
                    <ListItemText>
                        <a href="https://drive.google.com/uc?export=download&amp;id=1kHv83xjYCy_W6XGOVmN5ZBQ8tw18vGla" target="_blank"  rel="noreferrer noopener">File8</a>
                    </ListItemText>
                </ListItem>
            </List>
        </Grid>
      </Grid>
    </Layout>
  );
}
