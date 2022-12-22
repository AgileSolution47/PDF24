import React, { useState } from 'react';
// material
import {
  useTheme,
  experimentalStyled as styled
} from '@material-ui/core/styles';
import { Grid, Container, Typography, useMediaQuery } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
//
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingBottom: theme.spacing(10)
  }
}));

const ContentStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  textAlign: 'left',
  marginBottom: theme.spacing(1),
  width: '100%',
  [theme.breakpoints.up('md')]: {
    height: '100%',
    marginBottom: 0,
    textAlign: 'left',
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'top',
    paddingRight: theme.spacing(1)
  }
}));

const PoppinsMedium = "'PoppinsMedium', sans-serif";
const PoppinsStandard = "'PoppinsStandard', sans-serif";
// ----------------------------------------------------------------------

export default function LandingFaq() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  const [expanded, setExpanded] = useState('panel1');

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <RootStyle>
      <Container maxWidth="lg">
        <Grid container spacing={isDesktop ? 1 : 1}>
          <Grid item xs={12}>
            <ContentStyle>
              <Accordion
                expanded={expanded === 'panel1'}
                onChange={handleChange('panel1')}
                disableGutters
                sx={{
                  border: '1px solid #327FDE',
                  borderLeft: '15px solid #327FDE',
                  px: '20px',
                  borderRadius: '0px !important',
                  width: '100%',
                  '&:not(:last-child)': {
                    borderBottom: 0
                  },
                  '&:before': {
                    display: 'none'
                  }
                  // '& .MuiAccordion-root': {
                  //   borderLeft: '5px solid red'
                  // }
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: '#327FDE' }} />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                  sx={{
                    background: '#ffffff',
                    '& .MuiAccordionSummary-content': {
                      margin: '0 0 !important'
                    }
                  }}
                >
                  <Typography
                    variant="paragraph"
                    sx={{
                      fontFamily: PoppinsMedium,
                      fontSize: '30px',
                      fontWeight: 400,
                      color: '#327FDE',
                      mb: 0
                    }}
                  >
                    FAQ
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    padding: theme.spacing(2),
                    borderTop: '1px solid rgba(0, 0, 0, .125)'
                  }}
                >
                  <Typography
                    sx={{ fontFamily: PoppinsStandard, color: '#69829E' }}
                  >
                    View who’s coming at the office on a specific day and how
                    many seats are available.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expanded === 'panel2'}
                onChange={handleChange('panel2')}
                disableGutters
                sx={{
                  border: '1px solid #327FDE',
                  borderLeft: '15px solid #327FDE',
                  borderRadius: '0px !important',
                  width: '100%',
                  px: '20px',
                  '&:not(:last-child)': {
                    borderBottom: 0
                  },
                  '&:before': {
                    display: 'none'
                  }
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: '#327FDE' }} />}
                  aria-controls="panel2bh-content"
                  id="panel2bh-header"
                  sx={{
                    background: '#ffffff',
                    '& .MuiAccordionSummary-content': {
                      margin: '0 0 !important'
                    }
                  }}
                >
                  <Typography
                    variant="paragraph"
                    sx={{
                      fontFamily: PoppinsMedium,
                      fontSize: '30px',
                      fontWeight: 400,
                      color: '#327FDE',
                      mb: 0
                    }}
                  >
                    FAQ
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    padding: theme.spacing(2),
                    borderTop: '1px solid rgba(0, 0, 0, .125)'
                  }}
                >
                  <Typography
                    sx={{ fontFamily: PoppinsStandard, color: '#69829E' }}
                  >
                    View who’s coming at the office on a specific day and how
                    many seats are available.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </ContentStyle>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
