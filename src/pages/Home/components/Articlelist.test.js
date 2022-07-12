import React from "react";
import { render, screen, act } from '@testing-library/react';
import { unmountComponentAtNode } from "react-dom";

import ArticleList from './ArticleList';

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});


test('render article list', async() => {

    const data = {
        articles: [
            {
                title: "SpaceX, ULA targeting back-to-back geostationary launches",
                url: "https://www.teslarati.com/spacex-ula-back-to-back-geostationary-launches/",
                imageUrl: "https://www.teslarati.com/wp-content/uploads/2022/06/SES-22-F9-B1073-LC-40-prelaunch-062822-SpaceX-USSF-12-Atlas-V-541-ULA-1-c.jpg"
            },
            {
                title: "ULA rolls Atlas 5 rocket to launch pad at Cape Canaveral",
                url: "https://spaceflightnow.com/2022/06/29/atlas-5-ussf-12-rollout/",
                imageUrl: "https://spaceflightnow.com/wp-content/uploads/2022/06/atlasussf12-pre1.jpg"
            },
            {
                title: "Sierra Space signs agreement with Turkish Space Agency",
                url: "https://spacenews.com/sierra-space-signs-agreement-with-turkish-space-agency/",
                imageUrl: "https://spacenews.com/wp-content/uploads/2022/06/sierra-turkey.jpg"
            }
        ],
        total: 100
    }
    act(() => {
        render(<ArticleList loading={true} data={data} defaultCurrent={1} pageSizeOptions={10} onChangePagination={()=>{}} />, container);
    });
    for (let i = 0; i < data.articles.length; i++){
        expect(screen.getByText(data.articles[i].title)).toBeDefined();
    }

    const buttons = await screen.findAllByRole('button');
    expect(buttons).toHaveLength(data.articles.length + 2);    

});


