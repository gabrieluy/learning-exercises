'use strict';

function traverseTasks(data) {
    data.task_positions.forEach(taskPosition => {
        // Zips tasks here in place of their ids:
        const tasksForThisList = taskPosition.values.map(taskId => {
            return data.tasks.find(task => task.id === taskId);
        });

        // Find the corresponding List for this TaskPosition and
        // insert its tasks in it:
        data.lists.find((list, index) => {
            if (list.id === taskPosition.list_id) {
                data.lists[index].children = tasksForThisList;
                return true;
            }
            return false;
        });
    });

    return data;
}

module.exports = traverseTasks;
