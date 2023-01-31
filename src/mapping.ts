import { NewGravatar, UpdatedGravatar,CreateGravatarCall } from '../generated/Gravity/Gravity'
import { Gravatar,Transaction } from '../generated/schema'
//import { Transaction } from '../generated/schema'

export function handleNewGravatar(event: NewGravatar): void {
  let gravatar = new Gravatar(event.params.id.toHex())
  gravatar.owner = event.params.owner
  gravatar.displayName = event.params.displayName
  gravatar.imageUrl = event.params.imageUrl
  gravatar.save()
}

export function handleUpdatedGravatar(event: UpdatedGravatar): void {
  let id = event.params.id.toHex()
  let gravatar = Gravatar.load(id)
  if (gravatar == null) {
    gravatar = new Gravatar(id)
  }
  gravatar.owner = event.params.owner
  gravatar.displayName = event.params.displayName
  gravatar.imageUrl = event.params.imageUrl
  gravatar.save()
}

export function handleCreateGravatar(call: CreateGravatarCall): void {
  let id = call.transaction.hash
  let transaction = new Transaction(id.toString())
  transaction.displayName = call.inputs._displayName
  transaction.imageUrl = call.inputs._imageUrl
  transaction.save()
}