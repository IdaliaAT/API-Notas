import Category from './category/Category.model.js';
import Resource from './resource/Resource.model.js';
import Topic from './topic/Topic.model.js';
import User from './user/User.model.js';
import TopicCategory from './topicCategory/TopicCategory.model.js';
import Notes from './notes/Notes.model.js';
import Status from './status/Status.model.js';

// Lo siguiente es la asociacion de Category con User.
Category.belongsTo(User, {
	foreignKey: 'idUser',
	onDelete: 'CASCADE',
	onUpdate: 'CASCADE',
});
User.hasMany(Category, {
	foreignKey: 'idUser',
});

// Lo siguiente es la asociacion o relacion de Category con Topic, mediante una tabla de "union" o "intermedia".
Category.belongsToMany(Topic, {
	through: TopicCategory,
	foreignKey: 'idCategory',
});
Topic.belongsToMany(Category, {
	through: TopicCategory,
	foreignKey: 'idTopic',
});

// relación/asociación tablas topic y status
Topic.belongsTo(Status, {
	foreignKey: 'idStatus',
	onDelete: 'RESTRICT',
	onUpdate: 'CASCADE',
});
Status.hasMany(Topic, {
	foreignKey: 'idStatus',
});

// relación/asociación tablas resource y topic
Resource.belongsTo(Topic, {
	foreignKey: 'idTopic',
	onDelete: 'SET NULL',
	onUpdate: 'CASCADE',
});
Topic.hasMany(Resource, {
	foreignKey: 'idTopic',
});

// relación/asociación tablas notes y topic
Notes.belongsTo(Topic, {
	foreignKey: 'idTopic',
	onDelete: 'CASCADE',
	onUpdate: 'CASCADE',
});
Topic.hasMany(Notes, {
	foreignKey: 'idTopic',
});

export { Category, Resource, Topic, User, TopicCategory, Notes, Status };
