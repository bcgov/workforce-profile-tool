import { ResponsiveSankey } from '@nivo/sankey'
import FixTypeLater from '../@types/FixTypeLater'

interface Props {
  data: FixTypeLater
}

const FlowReportGraph = ({ data }: Props): JSX.Element => {
  console.log('---data---', data)

  const nodes = [
    {
      id: 'Hiring - DesGrp',
      nodeColor: 'rgba(110, 140, 170, 0.9)',
    },
    {
      id: 'Hiring - NonDesGrp',
      nodeColor: 'rgba(100, 100, 100, 0.9)',
    },
    {
      id: 'Hiring',
      nodeColor: 'rgba(100, 200, 100, 0.9)',
    },
    {
      id: 'Promotions - DesGrp',
      nodeColor: 'rgba(170, 140, 110, 0.9)',
    },
    {
      id: 'Promotions - NonDesGrp',
      nodeColor: 'rgba(100, 100, 100, 0.9)',
    },
    {
      id: 'Promotions',
      nodeColor: 'rgba(200, 100, 200, 0.9)',
    },
    {
      id: 'Org Size Adjustment',
      nodeColor: 'rgba(255, 255, 255, 1.0)',
    },
    {
      id: 'Org',
      nodeColor: 'rgba(200, 100, 100, 0.9)',
    },
    {
      id: 'Separations',
      nodeColor: 'rgba(100, 100, 100, 0.9)',
    },
    {
      id: 'Separations - DesGrp',
      nodeColor: 'rgba(250, 150, 50, 0.9)',
    },
    {
      id: 'Separations - NonDesGrp',
      nodeColor: 'rgba(100, 100, 100, 0.9)',
    },
  ]

  const links = [
    {
      source: 'Hiring - DesGrp',
      target: 'Hiring',
      value: 567,
    },
    {
      source: 'Hiring - NonDesGrp',
      target: 'Hiring',
      value: 7841,
    },
    { source: 'Hiring', target: 'Org', value: 10975 },
    {
      source: 'Promotions - DesGrp',
      target: 'Promotions',
      value: 532,
    },
    {
      source: 'Promotions - NonDesGrp',
      target: 'Promotions',
      value: 9874,
    },
    {
      source: 'Promotions',
      target: 'Org',
      value: 10895,
    },
    // {
    //   source: 'Org Size Adjustment',
    //   target: 'Org',
    //   value: 30000,
    // },
    { source: 'Org', target: 'Separations', value: 8794 },
    {
      source: 'Separations',
      target: 'Separations - DesGrp',
      value: 410,
    },
    {
      source: 'Separations',
      target: 'Separations - NonDesGrp',
      value: 5201,
    },
  ]

  return (
    <div style={{ height: '600px' }}>
      <ResponsiveSankey
        align="justify"
        colors={(node) => node.nodeColor}
        data={{ nodes, links }}
        enableLabels={true}
        enableLinkGradient={false}
        isInteractive={true}
        labelOrientation="vertical"
        labelPadding={16}
        labelPosition="outside"
        labelTextColor={{ from: 'color', modifiers: [['darker', 1]] }}
        linkBlendMode={'normal'}
        linkHoverOthersOpacity={0.1}
        linkOpacity={0.5}
        margin={{ top: 40, right: 160, bottom: 40, left: 50 }}
        nodeBorderColor={{ from: 'color', modifiers: [['darker', 0.8]] }}
        nodeBorderWidth={0}
        nodeInnerPadding={3}
        nodeOpacity={1}
        nodeSpacing={24}
        nodeThickness={18}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            translateX: 130,
            itemWidth: 100,
            itemHeight: 14,
            itemDirection: 'right-to-left',
            itemsSpacing: 2,
            itemTextColor: '#999',
            symbolSize: 14,
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: '#000',
                },
              },
            ],
          },
        ]}
        nodeTooltip={(node) => (
          <span>Custom tooltip for node: {node.node.id}</span>
        )}
        linkTooltip={(link) => (
          <span>
            Custom tooltip for link: {link.link.source.label} to{' '}
            {link.link.target.label}
          </span>
        )}
      />
    </div>
  )
}

export default FlowReportGraph
