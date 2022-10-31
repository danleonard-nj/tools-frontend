import { Grid, Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import Spinner from '../../Spinner';
import { KasaSceneCategoryList } from './KasaSceneCategoryList';
import { KasaSceneGrid } from './KasaSceneGrid';

export default function KasaSceneDisplayGrid() {
  const scenesLoading = useSelector((x) => x.scene.scenesLoading);
  const sceneCategoriesLoading = useSelector(
    (x) => x.scene.sceneCategoriesLoading
  );

  return scenesLoading || sceneCategoriesLoading ? (
    <Spinner />
  ) : (
    <Grid container>
      <Grid item lg={4}>
        <KasaSceneCategoryList />
      </Grid>
      <Grid item lg={8}>
        <Paper elevation={3} sx={{ padding: 1, m: 1 }}>
          <KasaSceneGrid />
        </Paper>
      </Grid>
    </Grid>
  );
}
