import { Grid } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterScenesByCategory } from '../../../store/kasa/actions/sceneActions';
import { setFilteredScenes } from '../../../store/kasa/sceneSlice';
import SceneButton from './SceneButton';

const KasaSceneGrid = () => {
  const dispatch = useDispatch();
  const scenes = useSelector((x) => x.scene.scenes);
  const selectedSceneCategory =
    useSelector((x) => x.scene.selectedSceneCategory) ?? '';
  const filteredScenes = useSelector((x) => x.scene.filteredScenes) ?? [];

  useEffect(() => {
    dispatch(filterScenesByCategory(selectedSceneCategory));
  }, [selectedSceneCategory, scenes]);

  return (
    <Grid container spacing={3}>
      {filteredScenes.map((scene) => (
        <Grid
          item
          key={scene.scene_id}
          lg={6}
          sx={{ padding: 1 }}
          id={`kasa-scene-display-grid-scene-container-id-${scene.scene_id}`}>
          <SceneButton scene={scene} />
        </Grid>
      ))}
    </Grid>
  );
};

export { KasaSceneGrid };
