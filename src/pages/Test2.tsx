import { PageRoute } from '@routes/@types/config'
import { Icon, IconifyIcon } from '@iconify/react'
import peopleFill from '@iconify/icons-eva/people-fill'
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill'

const getIcon = (icon: IconifyIcon) => <Icon icon={icon} width={22} height={22} />

const Test = () => (
  <div style={{ width: '100%', height: '200px', backgroundColor: 'green' }}>tttt</div>
)

export const testPage2: PageRoute = {
  path: 'test2',
  permissions: {},
  title: 'Test2',
  icon: getIcon(peopleFill),
  children: [
    {
      path: 'test2/mest',
      permissions: {},
      title: 'TestChild',
      icon: getIcon(pieChart2Fill),
      info: 'Hitler',
      component: Test,
    },
    {
      path: 'test2/hest',
      permissions: {},
      title: 'TestChild2',
      icon: getIcon(pieChart2Fill),
      info: 'Hitler',
      children: [
        {
          path: 'test2/hest/resr',
          permissions: {},
          title: 'TestChild2Child',
          icon: getIcon(pieChart2Fill),
          info: 'Hitler',
          component: Test,
        },
      ]
    }
  ]
}
