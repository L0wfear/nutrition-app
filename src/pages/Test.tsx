import { PageRoute } from '@routes/@types/config'
import { Icon, IconifyIcon } from '@iconify/react'
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill'

const getIcon = (icon: IconifyIcon) => <Icon icon={icon} width={22} height={22} />

const Test = () => (
  <div style={{ width: '100%', height: '200px', backgroundColor: 'red' }}>ffff</div>
)

export const testPage: PageRoute = {
  component: Test,
  path: 'test',
  permissions: {},
  title: 'Test',
  icon: getIcon(pieChart2Fill),
  info: 'Hile'
}
