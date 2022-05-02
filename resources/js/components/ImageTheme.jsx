import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { Grid } from "@mui/material";
import a1 from "../assets/images/asset1.jpg"
import a2 from "../assets/images/asset2.jpg"
import a3 from "../assets/images/asset3.jpg"
import a4 from "../assets/images/asset4.jpg"
import a5 from "../assets/images/asset5.jpg"

const images = [a1, a2, a3, a4, a5];
function ImageTheme() {
    const [image, setImage] = React.useState(images[0]);
    React.useEffect(() => {
        setImage(images[Math.floor(Math.random() * images.length)]);
    }, [images]);
  return (
    <>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(" + image + ")",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </>
  );
}

export default ImageTheme;
