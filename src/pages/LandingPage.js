// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
// components
import Page from '../components/Page';

import { LandingTopbar, LandingCompress, LandingInformation, LandingFaq } from '../components/landing-page';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)({
  height: '100%'
});

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.default
}));

// ----------------------------------------------------------------------

export default function LandingPage() {
  return (
    <RootStyle title="PDF24 tools | Home" id="move_top">
      <LandingTopbar />
      <ContentStyle>
        <LandingCompress />
        <LandingInformation />
        <LandingFaq />
      </ContentStyle>
    </RootStyle>
  );
}
