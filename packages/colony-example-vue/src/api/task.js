import * as ecp from '@/helpers/ecp'
import { getColony } from '@/helpers/colony-store'
import sendProxy from '@/helpers/send-proxy'

export async function createTask({ colony = getColony(), task }) {
  const proxy = sendProxy(colony)
  const newTask = {}
  await ecp.init()
  newTask.specificationHash = await ecp.saveHash(task.specification)
  await ecp.stop()
  if (task.domainId) newTask.domainId = task.domainId
  if (task.skillId) newTask.skillId = task.skillId
  if (task.dueDate) newTask.dueDate = new Date(task.dueDate)
  return proxy.addTask(newTask)
}

export async function getTasks({ colony = getColony() }) {
  const { count: taskCount } = await colony.getTaskCount.call()
  const tasksIds = [...Array(taskCount).keys()].map(k => k + 1)
  await ecp.init()
  const tasks = await Promise.all(tasksIds.map(taskId => (async () => {
    const task = await colony.getTask.call({ taskId })
    const specification = await ecp.getHash(task.specificationHash)
    return {
      ...task,
      specification: { ...specification },
    }
  })()))
  await ecp.stop()
  return tasks
}
